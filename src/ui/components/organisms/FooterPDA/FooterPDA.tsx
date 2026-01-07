"use client";

import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import { AtomButton, AtomText, AtomWrapper } from "@atoms";
import { FooterBorder } from "./FooterBorder";

export const FooterPDA = () => {
  return (
    <AtomWrapper variant="pda_footer" asChild>
      <footer>
        <FooterBorder />
        <AtomButton variant="destructive_with_label">
          <AtomButton variant="destructive" asChild>
            <span>X</span>
          </AtomButton>
          <AtomText variant="destructive_label">Вийти в Головне меню</AtomText>
        </AtomButton>
        <AtomWrapper variant="footer_destructive_arrows">
          <AtomButton variant="destructive_with_label">
            <AtomButton variant="destructive" asChild>
              <span>
                <FaLongArrowAltLeft />
              </span>
            </AtomButton>
            <AtomText variant="destructive_label" asChild>
              <span>Попереднє</span>
            </AtomText>
          </AtomButton>
          <AtomButton variant="destructive_with_label">
            <AtomButton variant="destructive" asChild>
              <span>
                <FaLongArrowAltRight />
              </span>
            </AtomButton>
            <AtomText variant="destructive_label" asChild>
              <span>Наступне</span>
            </AtomText>
          </AtomButton>
        </AtomWrapper>
      </footer>
    </AtomWrapper>
  );
};
