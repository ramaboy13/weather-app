/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";
import { CurrentWeather } from "@/components/CurrentWeather";
import "@testing-library/jest-dom";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "/",
}));

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
}));

describe("Frontend Components", () => {
  it("renders Header with location name", () => {
    render(<Header locationName="Test City" />);
    expect(screen.getByText("Test City")).toBeInTheDocument();
  });

  it("renders CurrentWeather with data", () => {
    const mockWeather = {
        current: {
            temperature: 25,
            condition: "Sunny",
            windSpeed: 10,
            windDirection: "N",
            humidity: 50,
            pressure: 1013,
            feelsLike: 27,
            isDay: true,
            time: "2023-01-01T12:00",
        },
        daily: [],
        hourly: []
    };
    render(<CurrentWeather weather={mockWeather} />);
    expect(screen.getByText("25°")).toBeInTheDocument();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
  });
});
