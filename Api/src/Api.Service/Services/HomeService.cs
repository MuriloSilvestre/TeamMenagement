using System;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Dtos.User;
using Domain.Interfaces.Services.User;
using Domain.Repository;
using Microsoft.AspNetCore.Http;

namespace Service.Services
{
    public class HomeService(
        IUserRepository repository,
        IUserRepository userRepository,
        IMapper mapper,
        IHttpContextAccessor httpContextAccessor)
        : IHomeService
    {
        public async Task<DashboardDto> GetDashboard()
        {
            var name = httpContextAccessor.HttpContext.User.Identity!.Name;

            var user = await userRepository.FindByLogin(name);

            if (user == null) throw new Exception("Usuário não autenticado.");

            var dashboard = await repository.GetDashboard(user.Id);
            
            return mapper.Map<DashboardDto>(dashboard);

        }
    }
}