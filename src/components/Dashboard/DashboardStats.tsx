import Card from '../ui/Card';

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <Card>
        <h2 className="text-lg font-bold">Total Photos</h2>
        <p className="text-2xl mt-2">12</p>
      </Card>
      <Card>
        <h2 className="text-lg font-bold">Albums</h2>
        <p className="text-2xl mt-2">3</p>
      </Card>
      <Card>
        <h2 className="text-lg font-bold">Favorites</h2>
        <p className="text-2xl mt-2">5</p>
      </Card>
    </div>
  );
}