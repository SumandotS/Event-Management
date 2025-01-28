import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { addEvent } from './actions'

export default function OrganizerDashboard() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Organizer Dashboard</h1>
      <form action={addEvent} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
          <Input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea id="description" name="description" required />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <Input type="date" id="date" name="date" required />
        </div>
        <Button type="submit">Add Event</Button>
      </form>
    </div>
  )
}