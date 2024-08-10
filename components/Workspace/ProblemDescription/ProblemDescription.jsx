"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { ClerkProvider, useClerk } from "@clerk/nextjs";
import { toast } from "react-toastify";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

const ProblemDescription = ({ problem, _solved }) => {
    const { user, isSignedIn } = useUser();
    const { client } = useClerk();
    const [currentProblem, setCurrentProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [problemDifficultyClass, setProblemDifficultyClass] = useState("");
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [starred, setStarred] = useState(false);
    const [solved, setSolved] = useState(_solved);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const getCurrentProblem = async () => {
            setLoading(true);
            try {
                const problemData = await client.api.get(`/problems/${problem.id}`);
                setCurrentProblem(problemData);
                setProblemDifficultyClass(
                    problemData.difficulty === "Easy"
                        ? "bg-olive text-olive"
                        : problemData.difficulty === "Medium"
                        ? "bg-dark-yellow text-dark-yellow"
                        : "bg-dark-pink text-dark-pink"
                );
            } catch (error) {
                console.error("Error fetching problem data", error);
                toast.error("Error fetching problem data");
            }
            setLoading(false);
        };
        getCurrentProblem();
    }, [problem.id, client]);
	useEffect(() => {
		console.log("Problem data:", problem);
	}, [problem]);
	
    return (
        <div className="problem-description">
            {loading ? (
                <RectangleSkeleton />
            ) : (
                <div>
                    <h1>{currentProblem?.title}</h1>
                    <p>{currentProblem?.description}</p>
                    {/* Additional rendering logic */}
                </div>
            )}
        </div>
    );
};

export default ProblemDescription;
