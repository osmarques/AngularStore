using AngularStore.Common.Entities;
using AngularStore.Common.Exceptions;

namespace AngularStore.Domain.Entities;

public class Product : BaseEntity
{
    public string Name { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public decimal Price { get; private set; }
    public int Stock { get; private set; }

    public Product(string name, string description, decimal price, int stock)
    {
        SetName(name);
        SetDescription(description);
        SetPrice(price);
        SetStock(stock);
    }

    private Product() { }

    public void Update(string name, string description, decimal price, int stock)
    {
        SetName(name);
        SetDescription(description);
        SetPrice(price);
        SetStock(stock);
    }

    private void SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new DomainException("Nome é obrigatório");
        if (name.Length > 100)
            throw new DomainException("Nome deve ter no máximo 100 caracteres");
        Name = name;
    }

    private void SetDescription(string description)
    {
        if (description?.Length > 500)
            throw new DomainException("Descrição deve ter no máximo 500 caracteres");
        Description = description ?? string.Empty;
    }

    private void SetPrice(decimal price)
    {
        if (price <= 0)
            throw new DomainException("Preço deve ser maior que zero");
        Price = price;
    }

    private void SetStock(int stock)
    {
        if (stock < 0)
            throw new DomainException("Estoque não pode ser negativo");
        Stock = stock;
    }
}