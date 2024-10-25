"use client";
import { useState } from "react";
import Streak from "./components/Streak";
import { BrowserProvider, ethers } from 'ethers';
import humorToken from "./contractInfo/humorToken.json"


const Page: React.FC = () => {
  const bgImageUrl =
    "https://wallpaper.forfun.com/fetch/13/136db7ec49866c6963fc6465b4a46f82.jpeg";

  // Initial demo meme requests
  const initialMemeRequests = [
    {
      title: "Funny Cat Meme",
      exampleLink: "https://example.com/cat-meme",
      imageUrl: "https://i.pinimg.com/236x/2c/c9/dd/2cc9dd8ed1860d3be29ef5361fb7e972.jpg",
      desc: "Looking for a hilarious cat meme to brighten someone's day.",

    },
    {
      title: "Programming Joke Meme",
      desc: "Create a meme about the struggles of coding and debugging.",
      exampleLink: "https://example.com/programming-meme",
      imageUrl: "https://example.com/programming-meme.jpg",
    },
    {
      title: "Relatable Work Meme",
      desc: "Need a meme that perfectly captures the Monday morning blues.",
      exampleLink: "https://example.com/work-meme",
      imageUrl: "https://example.com/work-meme.jpg",
    },
    {
      title: "Dad Joke Meme",
      desc: "Looking for a classic dad joke in meme form.",
      exampleLink: "https://example.com/dad-joke-meme",
      imageUrl: "https://example.com/dad-joke-meme.jpg",
    },
    {
      title: "Motivational Meme",
      desc: "Create a motivational meme to inspire others.",
      exampleLink: "https://example.com/motivational-meme",
      imageUrl: "https://example.com/motivational-meme.jpg",
    },
  ];

  // Initial demo submissions
  const initialSubmissions = [
    {
      link: "https://example.com/cat-meme-contribution",
      upvotes: 10,
      downvotes: 2,
      comments: ["So funny!", "This made my day!"],
    },
    // {
    //   link: "https://example.com/programming-meme-contribution",
    //   upvotes: 5,
    //   downvotes: 0,
    //   comments: ["Relatable!", "I know that feeling!"],
    // },
    // {
    //   link: "https://example.com/work-meme-contribution",
    //   upvotes: 7,
    //   downvotes: 1,
    //   comments: ["Every Monday...", "Classic!"],
    // },
  ];

  // State variables for meme requests
  const [memeRequests, setMemeRequests] = useState(initialMemeRequests);

  // State variables for modals and contributions
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contributeModalOpen, setContributeModalOpen] = useState<boolean>(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [exampleLink, setExampleLink] = useState<string>("");
  const [contributeMemeTitle, setContributeMemeTitle] = useState<string>("");
  const [contributionLink, setContributionLink] = useState<string>(""); // State for contribution link
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [commentText, setCommentText] = useState<string>("");

  // Function to handle request confirmation
  const handleConfirmRequest = async () => {
    const newMemeRequest = {
      title,
      desc: description,
      exampleLink,
      imageUrl: "https://example.com/new-meme.jpg", // Placeholder image URL for the new request
    };

    // Add the new request to the list
    setMemeRequests((prevRequests) => [...prevRequests, newMemeRequest]);

    alert(`Requested Meme:\nTitle: ${title}\nDescription: ${description}\nExample Link: ${exampleLink}`);

    // Reset the input fields and close the modal
    setTitle("");
    setDescription("");
    setExampleLink("");
    setIsModalOpen(false);
    const claimAmt = 1;
    const contractAddress = "0xaF91afD9420c7947ed8D5c8D14899F417eC39D7b"
    const provider = new BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("Wallet Address:", address);
    const humorTokenContract = new ethers.Contract(contractAddress, humorToken.abi, signer)
    // mint();
    console.log(claimAmt, "========inside withdraw===")

    await (await humorTokenContract.donate(address,"0x94A7Af5edB47c3B91d1B4Ffc2CA535d7aDA8CEDe" ,ethers.parseUnits(claimAmt.toString(), 18))).wait();
    alert("Meme Request Posted!!")

  };

  // Function to handle contribute button click
  const handleContributeClick = (meme: { title: string; imageUrl: string }) => {
    setContributeMemeTitle(meme.title);
    setContributeModalOpen(true);
  };

  // Function to confirm contribution
  const handleConfirmContribution = async () => {
    if (contributionLink) {
      const newSubmission = { link: contributionLink, upvotes: 0, downvotes: 0, comments: [] };
      setSubmissions((prev) => [...prev, newSubmission]);
      const claimAmt = 5;
      const contractAddress = "0xaF91afD9420c7947ed8D5c8D14899F417eC39D7b"
      const provider = new BrowserProvider(window.ethereum);
  
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log("Wallet Address:", address);
      const humorTokenContract = new ethers.Contract(contractAddress, humorToken.abi, signer)
      // mint();
      console.log(claimAmt, "========inside withdraw===")
  
      await (await humorTokenContract.mint(address, ethers.parseUnits(claimAmt.toString(), 18))).wait();
  
      setConfirmationMessage(`You received 5 HH for contributing to "${contributeMemeTitle}"!`);
      setContributionLink(""); // Clear the input field
      setContributeModalOpen(false);
    }
  };

  // Function to add a comment to a submission
  const handleAddComment = (index: number) => {
    if (commentText) {
      const updatedSubmissions = [...submissions];
      updatedSubmissions[index].comments.push(commentText);
      setSubmissions(updatedSubmissions);
      setCommentText(""); // Clear the comment input field
    }
  };

  return (
    <div
      className="h-[150vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      {/* Blurry container */}
      <div className="absolute top-32 left-16">
        <div className="bg-white/20 backdrop-blur-lg p-10 rounded-lg shadow-lg w-[600px] text-left h-[200px]">
          <h1 className="text-white text-3xl mb-2">Finding a meme?</h1>
          <p className="text-white text-lg mb-4">
            Thousands of people have chosen us
          </p>
          <button
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            onClick={() => setIsModalOpen(true)} // Open the modal
          >
            Request Here
          </button>
        </div>
      </div>

      {/* Move Streak to the top-right */}
      <div className="absolute top-20 right-8">
        <Streak totalPY={0} setTotalPY={function (amount: number): void { }} />
      </div>

      {/* Cards section below the blurry container */}
      <div className="relative top-[400px] flex justify-center space-x-4 flex-wrap px-4">
        {memeRequests.map((meme, index) => (
          <div
            key={index}
            className="transform transition-transform duration-300 hover:scale-105 perspective"
          >
            <div className="bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-lg w-64 h-72 text-left mb-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <h2 className="text-xl font-semibold text-white mb-2 relative z-10">{meme.title}</h2>
              <p className="text-white mb-2 relative z-10">{meme.desc}</p>
              <a
                href={meme.exampleLink}
                target="_blank"
                className="text-blue-300 underline mb-4 block relative z-10"
                rel="noopener noreferrer"
              >
                Example Link
              </a>
              {/* Contribute button positioned at the bottom left */}
              <div className="absolute bottom-4 left-4 z-20">
                <button
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
                  onClick={() => handleContributeClick(meme)}
                >
                  View
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent group-hover:from-blue-500 group-hover:to-blue-600 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for request */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl text-white mb-4">Request a Meme</h2>
            <label className="block mb-2 text-white">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded mb-4 text-black"
              required
            />
            <label className="block mb-2 text-white">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded mb-4 text-black"
              required
            ></textarea>
            <label className="block mb-2 text-white">Example Link:</label>
            <input
              type="url"
              value={exampleLink}
              onChange={(e) => setExampleLink(e.target.value)}
              className="w-full p-2 border rounded mb-4 text-black"
              required
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200 mr-2"
                onClick={handleConfirmRequest}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
                onClick={() => setIsModalOpen(false)} // Close the modal
                >
                Cancel
              </button>
            </div>
                <p className="mt-6 ml-4 text-red-400">*1 HH cost will be deducted</p>
          </div>
        </div>
      )}

      {/* Modal for contribution */}
      {contributeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg w-[90%] h-[90%] overflow-y-auto">
            <h2 className="text-2xl text-white mb-4">Contribute to "{contributeMemeTitle}"</h2>
            <p className="text-white mb-4">{`Description for "${contributeMemeTitle}"`}</p>
            {/* Display the requested meme image */}
            <img src={memeRequests.find(meme => meme.title === contributeMemeTitle)?.imageUrl} alt={contributeMemeTitle} className="mb-4 rounded-lg" />

            {/* Upvote/Downvote Section */}
            <div className="flex space-x-4 mb-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200">
                👍 Upvote
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200">
                👎 Downvote
              </button>
            </div>

            {/* Previous Submissions */}
            <h3 className="text-xl text-white mb-2">Previous Submissions:</h3>
            <ul className="mb-4">
              {submissions.map((submission, index) => (
                <li key={index} className="text-white mb-2">
                  {submission.link} - Upvotes: {submission.upvotes} Downvotes: {submission.downvotes}
                  <ul className="ml-4 mt-1">
                    {submission.comments.map((comment, commentIndex) => (
                      <li key={commentIndex} className="text-gray-300">- {comment}</li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full p-2 border rounded mb-2 text-black"
                    />
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
                      onClick={() => handleAddComment(index)}
                    >
                      Comment
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Input for new submission */}
            <label className="block mb-2 text-white">Add your Meme Link:</label>
            <input
              type="url"
              value={contributionLink}
              onChange={(e) => setContributionLink(e.target.value)}
              className="w-full p-2 border rounded mb-4 text-black"
              required
            />

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-200 mr-2"
                onClick={handleConfirmContribution}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
                onClick={() => setContributeModalOpen(false)} // Close the modal
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation message popup */}
      {contributeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white/20 backdrop-blur-lg p-8 rounded-lg w-[90%] h-[90%] overflow-y-auto">
            <h2 className="text-2xl text-white mb-4">Contribute to "{contributeMemeTitle}"</h2>
            {/* Display the requested meme image without shadow */}
            <img
              src={memeRequests.find(meme => meme.title === contributeMemeTitle)?.imageUrl}
              alt={contributeMemeTitle}
              className="mb-4 rounded-lg" // Removed shadow effect
            />
            <p className="text-white mb-4">{`Description for "${contributeMemeTitle}"`}</p>


            {/* Previous Submissions */}
            <div className="comment-sec bg-gray-800 w-[800px] rounded-xl">
            {/* <h3 className="text-xl text-white px-8 pt-4">Previous Submissions:</h3> */}
            <ul className="mb-4">
              {submissions.map((submission, index) => (
                <li key={index} className="text-white mb-4 border-b border-gray-300 pb-12 p-12">
                  <div className="flex items-center">
                    <span className="text-blue-400">{submission.link}</span>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center text-white">
                        <span className="material-icons ml-6">👍</span>
                        <span className="ml-1">{submission.upvotes}</span>
                      </button>
                      <button className="flex items-center text-white">
                        <span className="material-icons">👎</span>
                        <span className="ml-1">{submission.downvotes}</span>
                      </button>
                    </div>
                  </div>
                  <ul className="ml-4 mt-2">
                    {submission.comments.map((comment, commentIndex) => (
                      <li key={commentIndex} className="text-gray-300 flex items-center">
                        <span className="material-icons text-gray-500 mr-2">comment</span>
                        {comment}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 w-[500px]">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full p-2 border rounded mb-2 text-black"
                    />
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
                      onClick={() => handleAddComment(index)}
                    >
                      Comment
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            </div>

            {/* Input for new submission */}
            <label className="block mb-2 text-white">Add your Meme Link:</label>
            <input
              type="url"
              value={contributionLink}
              onChange={(e) => setContributionLink(e.target.value)}
              className="w-full p-2 border rounded mb-4 text-black"
              required
            />

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-200 mr-2"
                onClick={handleConfirmContribution}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
                onClick={() => setContributeModalOpen(false)} // Close the modal
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Page;
