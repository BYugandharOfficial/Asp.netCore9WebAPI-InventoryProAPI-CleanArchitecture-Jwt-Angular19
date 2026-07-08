using InventoryProAPI.Application.DTOs;
using InventoryProAPI.Application.Interfaces;
using InventoryProAPI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace InventoryProAPI.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        // GET: api/Supplier
        [HttpGet]
        public async Task<IActionResult> GetAllSuppliers()
        {
            var suppliers = await _supplierService.GetAllAsync();

            var supplierDtos = suppliers.Select(s => new SupplierDto
            {
                SupplierId = s.SupplierId,
                SupplierName = s.SupplierName,
                ContactPerson = s.ContactPerson,
                PhoneNumber = s.PhoneNumber,
                Email = s.Email,
                Address = s.Address,
                IsActive = s.IsActive,
                CreatedDate = s.CreatedDate,
                ModifiedDate = s.ModifiedDate
            });

            return Ok(supplierDtos);
        }

        // GET: api/Supplier/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupplierById(int id)
        {
            var supplier = await _supplierService.GetByIdAsync(id);

            if (supplier == null)
                return NotFound(new { Message = "Supplier not found." });

            var supplierDto = new SupplierDto
            {
                SupplierId = supplier.SupplierId,
                SupplierName = supplier.SupplierName,
                ContactPerson = supplier.ContactPerson,
                PhoneNumber = supplier.PhoneNumber,
                Email = supplier.Email,
                Address = supplier.Address,
                IsActive = supplier.IsActive,
                CreatedDate = supplier.CreatedDate,
                ModifiedDate = supplier.ModifiedDate
            };

            return Ok(supplierDto);
        }

        // POST: api/Supplier
        [HttpPost]
        public async Task<IActionResult> CreateSupplier([FromBody] SupplierDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var supplier = new Supplier
            {
                SupplierName = dto.SupplierName,
                ContactPerson = dto.ContactPerson,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                Address = dto.Address,
                IsActive = dto.IsActive,
                CreatedDate = DateTime.UtcNow
            };

            var createdSupplier = await _supplierService.AddAsync(supplier);

            dto.SupplierId = createdSupplier.SupplierId;

            return CreatedAtAction(
                nameof(GetSupplierById),
                new { id = createdSupplier.SupplierId },
                dto);
        }

        // PUT: api/Supplier/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupplier(int id, [FromBody] SupplierDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != dto.SupplierId)
                return BadRequest(new { Message = "Supplier ID mismatch." });

            var existingSupplier = await _supplierService.GetByIdAsync(id);

            if (existingSupplier == null)
                return NotFound(new { Message = "Supplier not found." });

            existingSupplier.SupplierName = dto.SupplierName;
            existingSupplier.ContactPerson = dto.ContactPerson;
            existingSupplier.PhoneNumber = dto.PhoneNumber;
            existingSupplier.Email = dto.Email;
            existingSupplier.Address = dto.Address;
            existingSupplier.IsActive = dto.IsActive;
            existingSupplier.ModifiedDate = DateTime.UtcNow;

            await _supplierService.UpdateAsync(existingSupplier);

            return Ok(new
            {
                Message = "Supplier updated successfully."
            });
        }

        // DELETE: api/Supplier/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            var existingSupplier = await _supplierService.GetByIdAsync(id);

            if (existingSupplier == null)
                return NotFound(new { Message = "Supplier not found." });

            await _supplierService.DeleteAsync(id);

            return Ok(new
            {
                Message = "Supplier deleted successfully."
            });
        }
    }
}
