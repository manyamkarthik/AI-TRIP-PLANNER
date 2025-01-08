import { UserIcon, UsersIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const groups = [
  { id: 'solo', name: 'Solo', description: 'Adventure alone', icon: UserIcon },
  { id: 'couple', name: 'Couple', description: 'Romantic getaway', icon: UsersIcon },
  { id: 'family', name: 'Family', description: 'Family fun', icon: HomeIcon },
  { id: 'friends', name: 'Friends', description: 'Group adventure', icon: UserGroupIcon },
];

export default function TravelGroup({ selected, onChange }) {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-gray-700">Who are you traveling with?</label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => onChange(group.id)}
            className={clsx(
              'relative rounded-lg border p-4 cursor-pointer hover:border-indigo-500 transition-colors',
              selected === group.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
            )}
          >
            <div className="flex flex-col items-center text-center">
              <group.icon className="h-8 w-8 text-indigo-600 mb-3" />
              <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
              <p className="text-sm text-gray-500">{group.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}