using Hartic.Models;

namespace Hartic.Data
{
    public interface IFurnitureRepository
    {
        Furniture[]? GetFurniture();
    }
}
