using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repository
{
    public interface IRepository<T> where T : Entity
    {
        Task<List<T>> GetAll();
        Task<T> Get(int id);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(int id);
    }
}