using InventoryProAPI.Application.Interfaces;
using InventoryProAPI.Domain.Entities;

namespace InventoryProAPI.Application.Services
{
    public class SaleService : ISaleService
    {
        private readonly ISaleRepository _repository;

        public SaleService(ISaleRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Sale>> GetAllSalesAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Sale?> GetSaleByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddSaleAsync(Sale sale)
        {
            await _repository.AddAsync(sale);
        }

        public async Task UpdateSaleAsync(Sale sale)
        {
            await _repository.UpdateAsync(sale);
        }

        public async Task DeleteSaleAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
