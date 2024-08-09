import Question from "./Question";
import GroupComponent from "./Group";
import SecondaryNav from "./SecondNav";
import { PostComponent } from './Post';

const BlogPage = () => {
  return (
    <div className="text-white pb-10 lg:px-12 md:px-8 sm:px-4">
      <div className="hidden lg:block w-full z-50">
        <SecondaryNav />
      </div>

      {/* Parent div */}
      <div className="flex flex-col lg:flex-row pt-10 lg:gap-x-24 md:gap-x-16 sm:gap-x-8 lg:px-8 md:px-6 sm:px-4">
        <div className="flex flex-col lg:w-8/12 md:w-7/12 sm:w-full">
          <PostComponent
            user="@keeping_it_simple21"
            date="16 Jul, 2024"
            language="Python"
            content="How to write a Python program that takes a list of numbers as input and returns a new list containing only the even numbers from the original list?"
            code={`def fxn(a, b): return a + b`}
          />
          <PostComponent
            user="@keeping_it_simple21"
            date="16 Jul, 2024"
            language="Python"
            content="How to write a Python program that takes a list of numbers as input and returns a new list containing only the even numbers from the original list?"
            code={`def fxn(a, b): return a + b`}
          />
        </div>

        <div className="border-l-2 pl-4 lg:w-4/12 md:w-5/12 sm:w-full border-muted">
          <div className="flex flex-col">
            <div className="flex justify-between pl-6 items-center md:pr-6 sm:pr-4 gap-x-2">
              <h2 className="text-xl md:text-2xl font-semibold">Popular Questions</h2>
              <span className="text-gray-400 border-b-2 text-sm md:text-lg">See all</span>
            </div>
            <Question
              user="@keeping_it_simple21"
              date="16 Jul, 2024"
              language="Python"
              content="How to write a Python program that takes a list of numbers as input and returns a new list containing only the even numbers from the original list?"
            />
            <Question
              user="@keeping_it_simple21"
              date="16 Jul, 2024"
              language="Java"
              content="How to write a Python program that takes a list of numbers as input and returns a new list containing only the even numbers from the original list?"
            />
          </div>
          <div className="mt-4 flex flex-col">
            <div className="flex justify-between pl-6 md:pr-10 sm:pr-6 items-center">
              <h2 className="text-xl md:text-2xl font-semibold">Groups</h2>
              <span className="text-gray-400 border-b-2 text-sm md:text-lg">See all</span>
            </div>
            <div className="flex flex-col lg:pr-6 md:pr-5 sm:pr-3">
              <GroupComponent name="Python" />
              <GroupComponent name="Python" />
              <GroupComponent name="Python" />
              <GroupComponent name="Python" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
