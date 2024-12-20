import AddColleaguesForm from "@/components/protected/Colleagues/AddColleagueForm";
import { getColleagues } from "@/components/protected/Colleagues/ColleagueFunctions";
import { headers } from "next/headers";
import Header from "@/components/protected/_Layout/header";
import ColleagueDetails from "@/components/protected/Colleagues/ColleagueDetails";
import Image from "next/image";

interface Colleague {
    uid: string;
    displayName: string;
    displayPicture: string;
    userTag: string;
    email: string;
    projectName: string;
}

const ColleaguePage = async () => {
    const incomingHeaders = headers();

    const headersObject: Record<string, string> = {};
    incomingHeaders.forEach((value, key) => {
        headersObject[key] = value;
    });

    let colleagues: Colleague[] = [];
    let loading = true;

    try {
        const colleagueData = await getColleagues(headersObject);
        colleagues = colleagueData?.colleagues || [];
    } catch (error) {
        console.error("Error fetching colleagues:", error);
    } finally {
        loading = false;
    }

    return (
        <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
            <Header />
            <div className="px-[90px] mb-2">
                <h1 className="text-sm text-white font-light">
                    <a href="/home" className="text-white hover:text-gray-300">Home</a> /
                    <span className="text-[#F6F61E] ml-1">Colleagues</span>
                </h1>
            </div>
            <div className="flex flex-row rounded-2xl shadow-lg mx-16 gap-[50px] mb-16 bg-white px-[150px] py-[70px] h-[790px]">
                <div className="w-full">
                    <AddColleaguesForm />
                    <h2 className="text-[#2b2b2b]">Your Colleagues</h2>
                    
                    {loading ? (
                        <div className="flex justify-center items-center mt-[150px]">
                            <Image
                                src="/resources/icons/loading.gif"
                                alt="Loading..."
                                width={160}
                                height={160}
                                unoptimized
                            />
                        </div>
                    ) : colleagues.length === 0 ? (
                        <div className="text-center text-[#2b2b2b] mt-[150px]">
                            <p>You have no colleagues.</p>
                        </div>
                    ) : (
                        <ColleagueDetails colleagues={colleagues} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ColleaguePage;
