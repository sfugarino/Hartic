using Hartic.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace Hartic.Data
{
    public class HarticContext : DbContext
    {
        public HarticContext(DbContextOptions<HarticContext> options)
            : base(options)
        {
        }

        public DbSet<Furniture>? Furniture { get; set; }
        public DbSet<CountDown>? CountDown { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Furniture>().HasData(
                new Furniture { Id = Guid.NewGuid(), Description = "Table", Count = 2  },
                new Furniture { Id = Guid.NewGuid(), Description = "Chair", Count = 18 });
        }
    }
}
