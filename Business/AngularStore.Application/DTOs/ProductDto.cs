namespace AngularStore.Application.DTOs;

public record ProductDto(int Id, string Name, string Description, decimal Price, int Stock, DateTime CreatedAt);

public record CreateProductDto(string Name, string Description, decimal Price, int Stock);

public record UpdateProductDto(string Name, string Description, decimal Price, int Stock);