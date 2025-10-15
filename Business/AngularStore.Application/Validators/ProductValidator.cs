using AngularStore.Application.DTOs;
using FluentValidation;

namespace AngularStore.Application.Validators;

public class CreateProductDtoValidator : AbstractValidator<CreateProductDto>
{
    public CreateProductDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Nome é obrigatório")
            .MaximumLength(100).WithMessage("Nome deve ter no máximo 100 caracteres");

        RuleFor(x => x.Description)
            .MaximumLength(500).WithMessage("Descrição deve ter no máximo 500 caracteres");

        RuleFor(x => x.Price)
            .NotNull().WithMessage("Preço é obrigatório")
            .GreaterThan(0).WithMessage("Preço deve ser maior que zero");

        RuleFor(x => x.Stock)
            .NotNull().WithMessage("Estoque é obrigatório")
            .GreaterThan(0).WithMessage("Estoque deve ser maior que zero");
    }
}

public class UpdateProductDtoValidator : AbstractValidator<UpdateProductDto>
{
    public UpdateProductDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Nome é obrigatório")
            .MaximumLength(100).WithMessage("Nome deve ter no máximo 100 caracteres");

        RuleFor(x => x.Description)
            .MaximumLength(500).WithMessage("Descrição deve ter no máximo 500 caracteres");

        RuleFor(x => x.Price)
            .NotNull().WithMessage("Preço é obrigatório")
            .GreaterThan(0).WithMessage("Preço deve ser maior que zero");

        RuleFor(x => x.Stock)
            .NotNull().WithMessage("Estoque é obrigatório")
            .GreaterThan(0).WithMessage("Estoque deve ser maior que zero");
    }
}