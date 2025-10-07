import Chart from "../../components/Chart";

export default function Progress() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-grotto text-4xl font-bold mb-6">Progress</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Chart title="Weekly Progress" />
                <Chart title="Monthly Progress" />
            </div>
        </div>
    );
}
