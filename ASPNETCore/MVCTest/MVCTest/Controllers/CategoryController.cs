using Microsoft.AspNetCore.Mvc;

namespace MVCTest.Controllers
{
    public class CategoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
