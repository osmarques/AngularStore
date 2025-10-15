using AngularStore.Application.DTOs;

namespace AngularStore.Application.Interfaces;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllAsync();
    Task<ProductDto?> GetByIdAsync(int id);
    Task<ProductDto> CreateAsync(CreateProductDto createDto);
    Task UpdateAsync(int id, UpdateProductDto updateDto);
    Task DeleteAsync(int id);
}