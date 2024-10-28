import LoginPage from '@/features/auth/login/page';
import RegisterPage from '@/features/auth/register/page';
import ProductEditPage from '@/features/pages/Product/EditPage';
import ProductPage from '@/features/pages/Product/page';
import CategoryEditPage from '@/features/pages/category/EditPage';
import CategoryPage from '@/features/pages/category/page';
import CustomerServicePage from '@/features/pages/customerService/page';
import Dashboard from '@/features/pages/dashboard/page';
import DetailPage from '@/features/pages/detail/page';
import MarketPage from '@/features/pages/market/page';
import ProfilePage from '@/features/pages/profile/page';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './_protected-routes';
export function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <MarketPage />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/complain',
          element: <CustomerServicePage />,
        },
        {
          path: '/category/',
          element: <CategoryPage />,
        },
        {
          path: '/product/',
          element: <ProductPage />,
        },
        {
          path: '/detail/:id',
          element: <DetailPage />,
        },
        {
          path: '/category/:id',
          element: <CategoryEditPage />,
        },
        {
          path: '/product/:id',
          element: <ProductEditPage />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
