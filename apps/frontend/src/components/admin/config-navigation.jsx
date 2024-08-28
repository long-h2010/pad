import SvgColor from '../../components/admin/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/public/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: icon('ic-analytics'),
  },
  {
    title: 'user',
    path: '/admin/user',
    icon: icon('ic-user'),
  },
  {
    title: 'document',
    path: '/admin/document',
    icon: icon('ic-document'),
  },
];

export default navConfig;
