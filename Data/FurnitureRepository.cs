using Hartic.Models;

namespace Hartic.Data
{
    public class FurnitureRepository : IFurnitureRepository
    {
        private readonly HarticContext _context;
        public FurnitureRepository(HarticContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _context.Database.EnsureCreated();
        }

        public Furniture[]? GetFurniture()
        {
            return _context.Furniture?.ToArray();
        }
    }
}
