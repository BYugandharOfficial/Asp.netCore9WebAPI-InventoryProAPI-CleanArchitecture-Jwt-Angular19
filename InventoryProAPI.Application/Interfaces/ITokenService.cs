using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryProAPI.Application.Interfaces;
using InventoryProAPI.Domain.Entities;
    

namespace InventoryProAPI.Application.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(string userId, string role);
    }
}
