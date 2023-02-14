import Loading from "./Loading";

export default function FullScreenLoading() {
    return (
        <div className="d-flex justify-content-center flex-row h-full">
            <div className="d-flex justify-content-center flex-column">
                <Loading />
            </div>
        </div>
    )
}