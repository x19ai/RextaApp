"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import Github from "./logos/GitHub";
import X from "@/components/logos/X";
import pkg from '@/package.json';
import DexScreener from "./logos/DexScreener";
import GitBook from "./logos/GitBook";
import Pumpfun from "./logos/Pumpfun";
import Rexta from "./logos/Rexta";
import appConfig from '../config/appConfig';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev: boolean) => !prev);
  };

  return (
    <>
      <div
        className={
          "fixed top-0 left-0 right-0 px-4 py-2 flex items-center h-14 z-50 bg-card border-b border-border"
        }
      >
        <Link href="/" passHref>
          <Button variant="ghost" className="flex items-center gap-2 hover:opacity-80 transition-opacity px-4">
            <Rexta className={"h-5 w-auto"} />
            <span className="font-semibold text-lg">{appConfig.companyName}</span>
          </Button>
        </Link>
        
        {/* Desktop Navigation */}
        <div className={"ml-auto hidden md:flex items-center gap-1"}>
          <div className="flex items-center">
            <Button
              onClick={() => {
                window.open(
                  appConfig.Github,
                  "_blank",
                  "noopener noreferrer"
                );
              }}
              variant={"ghost"}
              className={"ml-auto flex items-center gap-1.5"}
            >
              <span>
                <Github className={"size-4"} />
              </span>
              <span className="hidden sm:inline">Github</span>
            </Button>
            <Button
              onClick={() => {
                window.open(
                  appConfig.Gitbook,
                  "_blank",
                  "noopener noreferrer"
                );
              }}
              variant={"ghost"}
              className={"ml-auto flex items-center gap-1.5"}
            >
              <span>
                <GitBook className={"size-4"} />
              </span>
              <span className="hidden sm:inline">GitBook</span>
            </Button>
            <Button
              onClick={() => {
                window.open(
                  appConfig.DexScreener,
                  "_blank",
                  "noopener noreferrer"
                );
              }}
              variant={"ghost"}
              className={"ml-auto flex items-center gap-1.5"}
            >
              <span>
                <DexScreener className={"size-4"} />
              </span>
              <span className="hidden sm:inline">DexScreener</span>
            </Button>
            <Button
              onClick={() => {
                window.open(
                  appConfig.Pumpfun,
                  "_blank",
                  "noopener noreferrer"
                );
              }}
              variant={"ghost"}
              className={"ml-auto flex items-center gap-1.5"}
            >
              <span>
                <Pumpfun className={"size-4"} />
              </span>
              <span className="hidden sm:inline">Pumpfun</span>
            </Button>
          </div>
          <Button
            onClick={() => {
              window.open(
                appConfig.X,
                "_blank",
                "noopener noreferrer"
              );
            }}
            variant={"ghost"}
            className={"ml-auto flex items-center gap-1.5"}
          >
            <span>
              <X className={"size-4"} />
            </span>
            <span className="hidden sm:inline">X</span>
          </Button>
          <Button
            onClick={toggleDark}
            variant={"default"}
            className={"ml-auto flex items-center"}
          >
            <span>
              {isDarkMode ? (
                <Sun className={"size-4"} />
              ) : (
                <Moon className={"size-4"} />
              )}
            </span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="ml-auto flex md:hidden items-center gap-2">
          <Button
            onClick={toggleDark}
            variant={"default"}
            className={"flex items-center"}
          >
            <span>
              {isDarkMode ? (
                <Sun className={"size-4"} />
              ) : (
                <Moon className={"size-4"} />
              )}
            </span>
          </Button>
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant={"ghost"}
            className={"flex items-center"}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 bg-card border-b border-border p-4 flex flex-col gap-2 md:hidden z-40"
          >
            <motion.div
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.07,
                    delayChildren: 0.2
                  }
                }
              }}
              initial="closed"
              animate="open"
              className="flex flex-col gap-2"
            >
              {[
                { icon: Github, text: "Github", link: appConfig.Github },
                { icon: GitBook, text: "GitBook", link: appConfig.Gitbook },
                { icon: DexScreener, text: "DexScreener", link: appConfig.DexScreener },
                { icon: Pumpfun, text: "Pumpfun", link: appConfig.Pumpfun },
                { icon: X, text: "X", link: appConfig.X }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -20 }
                  }}
                >
                  <Button
                    onClick={() => {
                      window.open(item.link, "_blank", "noopener noreferrer");
                      setIsMenuOpen(false);
                    }}
                    variant={"ghost"}
                    className={"w-full justify-start gap-2"}
                  >
                    <item.icon className={"size-4"} />
                    <span>{item.text}</span>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
