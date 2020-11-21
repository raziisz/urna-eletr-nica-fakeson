using System.Threading.Tasks;

namespace backend.Repositories
{
    public interface IUnityOfWork
    {
        Task<bool> Commit();
        void Rollback();
    }
}