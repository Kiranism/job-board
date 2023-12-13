import CardSection from "./components/CardSection";
import Navbar from "./components/common/Navbar";
import { JobProvider } from "./components/context/JobContext";

function App() {
  return (
    <JobProvider>
      <Navbar />
      <main className="container mx-auto px-4 pb-10">
        <CardSection />
      </main>
    </JobProvider>
  );
}

export default App;
