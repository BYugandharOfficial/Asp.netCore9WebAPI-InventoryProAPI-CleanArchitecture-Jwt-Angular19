namespace InventoryProAPI.Application.DTOs
{
    public class SaleDto
    {
        public int SaleId { get; set; }

        public string SaleNumber { get; set; } = string.Empty;

        public int CustomerId { get; set; }

        public string? CustomerName { get; set; }

        public DateTime SaleDate { get; set; }

        public decimal TotalAmount { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public DateTime? ModifiedDate { get; set; }
    }
}
