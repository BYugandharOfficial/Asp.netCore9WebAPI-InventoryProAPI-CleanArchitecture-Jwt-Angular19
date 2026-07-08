using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using InventoryProAPI.Domain.Entities;

namespace InventoryProAPI.Application.Interfaces
{
    public interface ISupplierRepository
    { 
        Task<IEnumerable<Supplier>> GetAllAsync();
        Task<Supplier?> GetByIdAsync(int id);
        Task<Supplier> AddAsync(Supplier supplier);
        Task UpdateAsync(Supplier supplier);
        Task DeleteAsync(Supplier supplier);
        Task<bool> ExistsAsync(int id);
    }
}
