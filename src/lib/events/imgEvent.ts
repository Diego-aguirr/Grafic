// lib/events/image-events.ts
type Callback = () => void;

const listeners = new Set<Callback>();

export const imageEvents = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => {
      listeners.delete(cb); // ✅ no devolver el booleano
    };
  },
  dispatch() {
    listeners.forEach((cb) => cb());
  },
};
