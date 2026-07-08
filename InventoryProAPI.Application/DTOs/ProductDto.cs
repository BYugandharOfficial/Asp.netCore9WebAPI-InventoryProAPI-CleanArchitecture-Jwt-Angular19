using InventoryProAPI.Application.Interfaces;
using InventoryProAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryProAPI.Application.DTOs
{
    public class ProductDto
    {
        public int ProductId { get; set; }

        [Required]
        [StringLength(100)]
        public string ProductName { get; set; } = string.Empty;

        [Required]
        public int CategoryId { get; set; }

        public string? CategoryName { get; set; }

        [Required]
        public int SupplierId { get; set; }

        public string? SupplierName { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        [Range(typeof(decimal), "0.01", "9999999999999999")]
        public decimal Price { get; set; }

        [StringLength(50)]
        public string? Unit { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
