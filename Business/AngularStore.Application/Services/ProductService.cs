using AngularStore.Application.DTOs;
using AngularStore.Application.Interfaces;
using AngularStore.Domain.Entities;
using AngularStore.Domain.Interfaces;
using AngularStore.Common.Exceptions;

namespace AngularStore.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ProductDto>> GetAllAsync()
    {
        var products = await _repository.GetAllAsync();
        return products.Select(p => new ProductDto(p.Id, p.Name, p.Description, p.Price, p.Stock, p.CreatedAt));
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var product = await _repository.GetByIdAsync(id);
        return product == null ? null : new ProductDto(product.Id, product.Name, product.Description, product.Price, product.Stock, product.CreatedAt);
    }

    public async Task<ProductDto> CreateAsync(CreateProductDto createDto)
    {
        var product = new Product(createDto.Name, createDto.Description, createDto.Price, createDto.Stock);
        var createdProduct = await _repository.AddAsync(product);
        return new ProductDto(createdProduct.Id, createdProduct.Name, createdProduct.Description, createdProduct.Price, createdProduct.Stock, createdProduct.CreatedAt);
    }

    public async Task UpdateAsync(int id, UpdateProductDto updateDto)
    {
        var product = await _repository.GetByIdAsync(id);
        if (product == null)
            throw new DomainException("Produto não encontrado");

        product.Update(updateDto.Name, updateDto.Description, updateDto.Price, updateDto.Stock);
        await _repository.UpdateAsync(product);
    }

    public async Task DeleteAsync(int id)
    {
        if (!await _repository.ExistsAsync(id))
            throw new DomainException("Produto não encontrado");

        await _repository.DeleteAsync(id);
    }
}