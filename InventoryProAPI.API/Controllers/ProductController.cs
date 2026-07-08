using InventoryProAPI.Application.DTOs;
using InventoryProAPI.Application.Interfaces;
using InventoryProAPI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace InventoryProAPI.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();

            if (products == null || !products.Any())
            {
                return NotFound(new
                {
                    Message = "No products found."
                });
            }

            return Ok(products);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);

            if (product == null)
            {
                return NotFound(new
                {
                    Message = "Product not found."
                });
            }

            var dto = new ProductDto
            {
                ProductId = product.ProductId,
                ProductName = product.ProductName,
                CategoryId = product.CategoryId,
                CategoryName = product.Category?.CategoryName,
                SupplierId = product.SupplierId,
                SupplierName = product.Supplier?.SupplierName,
                Quantity = product.Quantity,
                Price = product.Price,
                Unit = product.Unit,
                Description = product.Description,
                IsActive = product.IsActive
            };

            return Ok(dto);
        }

        // POST: api/Products
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] ProductDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = new Product
            {
                ProductName = dto.ProductName,
                CategoryId = dto.CategoryId,
                SupplierId = dto.SupplierId,
                Quantity = dto.Quantity,
                Price = dto.Price,
                Unit = dto.Unit,
                Description = dto.Description,
                IsActive = dto.IsActive,
                CreatedDate = DateTime.UtcNow
            };

            var createdProduct = await _productService.CreateProductAsync(product);

            dto.ProductId = createdProduct.ProductId;

            return CreatedAtAction(
                nameof(GetProductById),
                new { id = dto.ProductId },
                dto);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductDto dto)
        {
            if (id != dto.ProductId)
            {
                return BadRequest(new
                {
                    Message = "Product ID mismatch."
                });
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingProduct = await _productService.GetProductByIdAsync(id);

            if (existingProduct == null)
            {
                return NotFound(new
                {
                    Message = "Product not found."
                });
            }

            existingProduct.ProductName = dto.ProductName;
            existingProduct.CategoryId = dto.CategoryId;
            existingProduct.SupplierId = dto.SupplierId;
            existingProduct.Quantity = dto.Quantity;
            existingProduct.Price = dto.Price;
            existingProduct.Unit = dto.Unit;
            existingProduct.Description = dto.Description;
            existingProduct.IsActive = dto.IsActive;
            existingProduct.ModifiedDate = DateTime.UtcNow;

            await _productService.UpdateProductAsync(existingProduct);

            return Ok(new
            {
                Message = "Product updated successfully."
            });
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var existingProduct = await _productService.GetProductByIdAsync(id);

            if (existingProduct == null)
            {
                return NotFound(new
                {
                    Message = "Product not found."
                });
            }

            await _productService.DeleteProductAsync(id);

            return Ok(new
            {
                Message = "Product deleted successfully."
            });
        }
    }
}
