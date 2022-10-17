using Hartic.Models;
using Microsoft.EntityFrameworkCore;

namespace Hartic.Data
{
    public class CountDownRepository : ICountDownRepository
    {
        private readonly HarticContext _context;
        public CountDownRepository(HarticContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _context.Database.EnsureCreated();
        }

        public CountDown Start()
        {
            var countDown = new CountDown
            {
                StartDate = DateTime.Now,
                Duration = (long)((new TimeSpan(0, 0, 2, 30)).TotalSeconds)
            };
            _context.Entry<CountDown>(countDown).State = EntityState.Added;
            _context.SaveChanges();

            return countDown;
        }

        public void Stop(int id)
        {
            var entity = _context.CountDown?.FirstOrDefault(item => item.CountDownId == id);

            if (entity != null)
            {
                entity.EndDate = DateTime.Now;
                entity.Complete = true;
                _context.SaveChanges();
            }
        }
    }
}
