using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using AngularStore.Application.Interfaces;
using AngularStore.Application.Services;
using AngularStore.Domain.Interfaces;
using AngularStore.Repository.Data;
using AngularStore.Repository.Repositories;

namespace AngularStore.Ioc;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseInMemoryDatabase("ProductsDb"));

        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IProductService, ProductService>();

        return services;
    }
}