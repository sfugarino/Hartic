using Hartic.Models;

namespace Hartic.Data
{
    public interface ICountDownRepository
    {
        CountDown Start();
        void Stop(int id);
    }
}
