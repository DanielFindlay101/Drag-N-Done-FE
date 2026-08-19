import "react";

declare module "react" {
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    command?: string;
    commandFor?: string;
  }
}
