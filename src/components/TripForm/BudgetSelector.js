import { BanknotesIcon, CurrencyDollarIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const budgetOptions = [
  {
    id: 'budget',
    name: 'Budget',
    description: 'Cost-conscious travel',
    icon: BanknotesIcon,
  },
  {
    id: 'moderate',
    name: 'Moderate',
    description: 'Balanced spending',
    icon: CurrencyDollarIcon,
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium experience',
    icon: CreditCardIcon,
  },
];

export default function BudgetSelector({ selected, onChange }) {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-gray-700">What's your budget range?</label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {budgetOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onChange(option.id)}
            className={clsx(
              'relative rounded-lg border p-4 cursor-pointer hover:border-indigo-500 transition-colors',
              selected === option.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
            )}
          >
            <div className="flex flex-col items-center text-center">
              <option.icon className="h-8 w-8 text-indigo-600 mb-3" />
              <h3 className="text-lg font-medium text-gray-900">{option.name}</h3>
              <p className="text-sm text-gray-500">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}