using Microsoft.AspNetCore.Mvc;
using AngularStore.Application.DTOs;
using AngularStore.Application.Interfaces;
using AngularStore.Application.Validators;
using AngularStore.Common.Exceptions;
using AngularStore.Common.Models;
using FluentValidation;

namespace AngularStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    /// <summary>
    /// Obtém todos os produtos
    /// </summary>
    /// <returns>Lista de produtos</returns>
    /// <response code="200">Retorna a lista de produtos</response>
    [HttpGet]
    public async Task<ActionResult<Result<IEnumerable<ProductDto>>>> GetProducts()
    {
        var products = await _productService.GetAllAsync();
        return Ok(Result<IEnumerable<ProductDto>>.Ok(products));
    }

    /// <summary>
    /// Obtém um produto específico pelo ID
    /// </summary>
    /// <param name="id">ID do produto</param>
    /// <returns>Produto encontrado</returns>
    /// <response code="200">Retorna o produto</response>
    /// <response code="404">Produto não encontrado</response>
    [HttpGet("{id}")]
    public async Task<ActionResult<Result<ProductDto>>> GetProduct(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        return product == null ? NotFound(Result<ProductDto>.Failure("Produto não encontrado")) : Ok(Result<ProductDto>.Ok(product));
    }

    /// <summary>
    /// Cria um novo produto
    /// </summary>
    /// <param name="createDto">Dados do produto a ser criado</param>
    /// <returns>Produto criado</returns>
    /// <response code="201">Produto criado com sucesso</response>
    /// <response code="400">Dados inválidos</response>
    [HttpPost]
    public async Task<ActionResult<Result<ProductDto>>> PostProduct(CreateProductDto createDto)
    {
        var validator = new CreateProductDtoValidator();
        var validationResult = validator.Validate(createDto);
        
        if (!validationResult.IsValid)
        {
            var errors = string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage));
            return BadRequest(Result<ProductDto>.Failure(errors));
        }

        try
        {
            var product = await _productService.CreateAsync(createDto);
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, Result<ProductDto>.Ok(product));
        }
        catch (DomainException ex)
        {
            return BadRequest(Result<ProductDto>.Failure(ex.Message));
        }
    }

    /// <summary>
    /// Atualiza um produto existente
    /// </summary>
    /// <param name="id">ID do produto</param>
    /// <param name="updateDto">Dados atualizados do produto</param>
    /// <returns>Resultado da operação</returns>
    /// <response code="200">Produto atualizado com sucesso</response>
    /// <response code="400">Dados inválidos</response>
    [HttpPut("{id}")]
    public async Task<ActionResult<Result>> PutProduct(int id, UpdateProductDto updateDto)
    {
        var validator = new UpdateProductDtoValidator();
        var validationResult = validator.Validate(updateDto);
        
        if (!validationResult.IsValid)
        {
            var errors = string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage));
            return BadRequest(Result.Failure(errors));
        }

        try
        {
            await _productService.UpdateAsync(id, updateDto);
            return Ok(Result.Ok());
        }
        catch (DomainException ex)
        {
            return BadRequest(Result.Failure(ex.Message));
        }
    }

    /// <summary>
    /// Exclui um produto
    /// </summary>
    /// <param name="id">ID do produto a ser excluído</param>
    /// <returns>Resultado da operação</returns>
    /// <response code="200">Produto excluído com sucesso</response>
    /// <response code="404">Produto não encontrado</response>
    [HttpDelete("{id}")]
    public async Task<ActionResult<Result>> DeleteProduct(int id)
    {
        try
        {
            await _productService.DeleteAsync(id);
            return Ok(Result.Ok());
        }
        catch (DomainException)
        {
            return NotFound(Result.Failure("Produto não encontrado"));
        }
    }
}