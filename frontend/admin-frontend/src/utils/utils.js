import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
      return twMerge(clsx(inputs))
}


export function toCapitalized(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
}

export function toggleDropdown(key, openDropdowns, setOpenDropdowns) {
      setOpenDropdowns(prevState => ({
            ...prevState,
            [key]: !prevState[key]
      }))
}