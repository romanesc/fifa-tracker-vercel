import { PulseLoader } from 'react-spinners'

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center p-4">
      <PulseLoader color="#3B82F6" /> {/* This is the Tailwind blue-500 color */}
    </div>
  )
}