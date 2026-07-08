using InventoryProAPI.Application.DTOs;
using InventoryProAPI.Application.Interfaces;
using InventoryProAPI.Domain.Entities;
using InventoryProAPI.Infrastructure;
using InventoryProAPI.Infrastructure.ExternalServices;
using InventoryProAPI.Persistence.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryProAPI.WebAPI.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly AppDbContext _context; // Add this field

        public AuthController(ITokenService tokenService, AppDbContext context) // Add context to constructor
        {
            _tokenService = tokenService;
            _context = context;

        }

        // for new login generate Hash
        //[HttpGet("generatehash")]
        //public IActionResult GenerateHash()
        //{
        //    string hash = BCrypt.Net.BCrypt.HashPassword("Admin123");

        //    return Ok(hash);
        //}
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var user = _context.Users
                .FirstOrDefault(x => x.Name == loginDto.UserName);

            if (user == null)
                return Unauthorized("User not found");

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(
                loginDto.Password,
                user.PasswordHash);

            if (!isValidPassword)
                return Unauthorized("Invalid password");

            var token = _tokenService.GenerateToken(
                user.Name,
                user.Role);

            return Ok(new {
                Message = "Login Successful",
                Token = token });
        }
    }
}
