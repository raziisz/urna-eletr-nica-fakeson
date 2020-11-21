using System.Threading.Tasks;
using backend.Data;

namespace backend.Repositories
{
  public class UnityOfWork : IUnityOfWork
  {
    private readonly DataContext context;
    public UnityOfWork(DataContext context)
    {
      this.context = context;

    }
    public async Task<bool> Commit()
    {
      return await context.SaveChangesAsync() > 0;
    }

    public void Rollback()
    {
      throw new System.NotImplementedException();
    }
  }
}