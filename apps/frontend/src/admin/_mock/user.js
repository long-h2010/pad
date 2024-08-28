import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/public/images/avatar/avatar-${index + 1}.webp`,
  name: faker.person.fullName(),
  status: sample(['active', 'banned']),
}));
