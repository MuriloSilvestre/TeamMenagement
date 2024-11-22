using System.Threading.Tasks;
using Domain.Dtos.User;

namespace Domain.Interfaces.Services.User
{
    public interface IHomeService
    {
        Task<DashboardDto> GetDashboard();
    }
}
