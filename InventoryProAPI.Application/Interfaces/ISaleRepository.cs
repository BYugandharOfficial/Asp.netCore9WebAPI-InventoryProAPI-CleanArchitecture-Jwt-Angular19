using InventoryProAPI.Domain.Entities;

namespace InventoryProAPI.Application.Interfaces
{
    public interface ISaleRepository
    {
        Task<IEnumerable<Sale>> GetAllAsync();
        Task<Sale?> GetByIdAsync(int id);
        Task AddAsync(Sale sale);
        Task UpdateAsync(Sale sale);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
