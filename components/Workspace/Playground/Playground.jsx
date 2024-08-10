import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
// import { Problem } from "@/utils/types/problem";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

const Playground = ({ problem, setSuccess, setSolved }) => {
    const [activeTestCaseId, setActiveTestCaseId] = useState(0);
    const [userCode, setUserCode] = useState(problem.starterCode);
    const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

    const [settings, setSettings] = useState({
        fontSize: fontSize,
        settingsModalIsOpen: false,
        dropdownIsOpen: false,
    });

    const { user } = useUser();
    const router = useRouter();
    const [pid, setPid] = useState(null); // Initialize pid with null

    useEffect(() => {
        if (router.query && router.query.pid) {
            setPid(router.query.pid); // Set pid when available
        }
    }, [router.query]);

    const handleSubmit = async () => {
        if (!user) {
            toast.error("Please login to submit your code", {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
            return;
        }

        if (!pid) {
            toast.error("Problem ID is missing", {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
            return;
        }

        try {
            userCode.slice(userCode.indexOf(problem.starterFunctionName));
            const cb = new Function(`return ${userCode}`)();
            const handler = problems[pid]?.handlerFunction; // Optional chaining

            if (typeof handler === "function") {
                const success = handler(cb);
                if (success) {
                    toast.success("Congrats! All tests passed!", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "dark",
                    });
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 4000);

                    // Handle user progress here
                    setSolved(true);
                }
            }
        } catch (error) {
            console.log(error.message);
            if (
                error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
            ) {
                toast.error("Oops! One or more test cases failed", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                });
            } else {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        }
    };

    useEffect(() => {
        if (!pid) return; // Guard clause if pid is undefined

        const code = localStorage.getItem(`code-${pid}`);
        if (user) {
            setUserCode(code ? JSON.parse(code) : problem.starterCode);
        } else {
            setUserCode(problem.starterCode);
        }
    }, [pid, user, problem.starterCode]);

    const onChange = (value) => {
        setUserCode(value);
        if (pid) {
            localStorage.setItem(`code-${pid}`, JSON.stringify(value));
        }
    };

    return (
        <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
            <PreferenceNav settings={settings} setSettings={setSettings} />

            <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
                <div className='w-full overflow-auto'>
                    <CodeMirror
                        value={userCode}
                        theme={vscodeDark}
                        onChange={onChange}
                        extensions={[javascript()]}
                        style={{ fontSize: settings.fontSize }}
                    />
                </div>
                <div className='w-full px-5 overflow-auto'>
                    {/* testcase heading */}
                    <div className='flex h-10 items-center space-x-6'>
                        <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                            <div className='text-sm font-medium leading-5 text-white'>Testcases</div>
                            <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                        </div>
                    </div>

                    <div className='flex'>
                        {problem.examples.map((example, index) => (
                            <div
                                className='mr-2 items-start mt-2 '
                                key={example.id}
                                onClick={() => setActiveTestCaseId(index)}
                            >
                                <div className='flex flex-wrap items-center gap-y-4'>
                                    <div
                                        className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                                        ${activeTestCaseId === index ? "text-white" : "text-gray-500"}
                                    `}
                                    >
                                        Case {index + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='font-semibold my-4'>
                        <p className='text-sm font-medium mt-4 text-white'>Input:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                            {problem.examples[activeTestCaseId].inputText}
                        </div>
                        <p className='text-sm font-medium mt-4 text-white'>Output:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                            {problem.examples[activeTestCaseId].outputText}
                        </div>
                    </div>
                </div>
            </Split>
            <EditorFooter handleSubmit={handleSubmit} />
        </div>
    );
};

export default Playground;
