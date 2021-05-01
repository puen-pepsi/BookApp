using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IRepository
    {
         Task<List<T>> SelectAll<T>() where T : class;
         Task<T> SelectById<T>(int id) where T : class;
         Task CreateAsync<T>(T entity) where T : class;
         Task UpdateAsync<T>(T entity) where T : class;
         Task DeleteAsync<T>(T entity) where T : class;
    }
}