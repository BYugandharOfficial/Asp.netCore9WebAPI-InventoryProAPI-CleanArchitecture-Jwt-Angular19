using InventoryProAPI.Application.DTOs;
using InventoryProAPI.Application.Interfaces;
using InventoryProAPI.Application.Services;
using InventoryProAPI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace InventoryProAPI.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly ISaleService _service;

        public SaleController(ISaleService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sales = await _service.GetAllSalesAsync();

            var result = sales.Select(s => new SaleDto
            {
                SaleId = s.SaleId,
                SaleNumber = s.SaleNumber,
                CustomerId = s.CustomerId,
                SaleDate = s.SaleDate,
                TotalAmount = s.TotalAmount,
                IsActive = s.IsActive,
                CreatedDate = s.CreatedDate,
                ModifiedDate = s.ModifiedDate
            });

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var sale = await _service.GetSaleByIdAsync(id);

            if (sale == null)
                return NotFound();

            var dto = new SaleDto
            {
                SaleId = sale.SaleId,
                SaleNumber = sale.SaleNumber,
                CustomerId = sale.CustomerId,
                SaleDate = sale.SaleDate,
                TotalAmount = sale.TotalAmount,
                IsActive = sale.IsActive,
                CreatedDate = sale.CreatedDate,
                ModifiedDate = sale.ModifiedDate
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SaleDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var sale = new Sale
            {
                SaleNumber = dto.SaleNumber,
                CustomerId = dto.CustomerId,
                SaleDate = dto.SaleDate,
                TotalAmount = dto.TotalAmount,
                IsActive = dto.IsActive,
                CreatedDate = DateTime.UtcNow
            };

            await _service.AddSaleAsync(sale);

            dto.SaleId = sale.SaleId;

            return CreatedAtAction(nameof(GetById), new { id = sale.SaleId }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SaleDto dto)
        {
            if (id != dto.SaleId)
                return BadRequest("Sale ID mismatch.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var sale = await _service.GetSaleByIdAsync(id);

            if (sale == null)
                return NotFound();

            sale.SaleNumber = dto.SaleNumber;
            sale.CustomerId = dto.CustomerId;
            sale.SaleDate = dto.SaleDate;
            sale.TotalAmount = dto.TotalAmount;
            sale.IsActive = dto.IsActive;
            sale.ModifiedDate = DateTime.UtcNow;

            await _service.UpdateSaleAsync(sale);

            return Ok(sale);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sale = await _service.GetSaleByIdAsync(id);

            if (sale == null)
                return NotFound();

            await _service.DeleteSaleAsync(id);

            return NoContent();
        }
    }
}
