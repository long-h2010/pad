import SvgColor from '../../components/admin/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`../public/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'document',
    path: '/admin/document',
    icon: icon('ic_document'),
  },
];

export default navConfig;
