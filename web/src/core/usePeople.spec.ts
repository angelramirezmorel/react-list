import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { usePeople } from "./usePeople";

describe("usePeople", () => {
  it("returns people from the mock API", async () => {
    const { result } = renderHook(() => usePeople());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.people.length).toBeGreaterThan(0);
    expect(result.current.people[0].name).toBe("Luke Skywalker");
  });
});
