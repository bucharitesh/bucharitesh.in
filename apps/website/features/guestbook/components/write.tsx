'use client';

import { validateAndSaveEntry } from '@/features/guestbook/actions/actions';
import {
  hasCreatedEntryBeforeAtom,
  localCreatedByIdAtom,
  localEntriesAtom,
} from '@/features/guestbook/data/guestbook';
import useClickOutside from '@/lib/hooks/use-click-outside';
import { cn } from '@/lib/utils';
import Signature, { type SignatureRef } from '@uiw/react-signature';
import { useAtom, useSetAtom } from 'jotai';
import { ArrowBigDown } from 'lucide-react';
import {
  AnimatePresence,
  MotionConfig,
  type Transition,
  motion,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import useMeasure from 'react-use-measure';
import Field from './field';
// import { useEasterEggs } from "@/lib/providers/easter-egg-provider";

const transition: Transition = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.25,
};

export default function WriteNoteCTA() {
  const [step, setStep] = useState<number>(0);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const [maxWidth, setMaxWidth] = useState(0);
  const [formInfo, setFormInfo] = useState({
    created_by: '',
    entry: '',
    signature: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const setLocalEntries = useSetAtom(localEntriesAtom);
  const [hasCreatedEntryBefore, setHasCreatedEntryBefore] = useAtom(
    hasCreatedEntryBeforeAtom
  );
  const [localCreatedById, setLocalCreatedById] = useAtom(localCreatedByIdAtom);

  // const { discoverEgg } = useEasterEggs();

  const buttonText = ['Write me a note', 'Next', 'Submit', 'Thanks!'][step];

  const ref = useRef<HTMLDivElement>(null!);
  const formRef = useRef<HTMLFormElement>(null!);
  const $svg = useRef<SignatureRef>(null!);
  const { pending } = useFormStatus();
  const [loading, setLoading] = useState(false);

  const handleCreatedByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfo({
      ...formInfo,
      created_by: e.target.value,
    });
  };

  const handleEntryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfo({
      ...formInfo,
      entry: e.target.value,
    });
  };

  const handleSVGCapture = () => {
    const svgelm = $svg.current?.svg?.cloneNode(true) as SVGSVGElement;
    const clientWidth = $svg.current?.svg?.clientWidth;
    const clientHeight = $svg.current?.svg?.clientHeight;
    svgelm.removeAttribute('style');
    svgelm.setAttribute('width', `${clientWidth}px`);
    svgelm.setAttribute('height', `${clientHeight}px`);
    svgelm.setAttribute('viewbox', `${clientWidth} ${clientHeight}`);
    setFormInfo((prev) => ({
      ...prev,
      signature: svgelm.outerHTML,
    }));
    return svgelm.outerHTML;
  };

  const stepConent = (step: number, svgRef: React.RefObject<SignatureRef>) => {
    switch (step) {
      case 1:
        return (
          <fieldset className="flex flex-col gap-y-4 p-2">
            <Field
              label="ur name, handle, something"
              value={formInfo.created_by}
              name="created_by"
              placeholder="uncle ben"
              onChange={handleCreatedByChange}
            />
            <Field
              label="a sweet likkle note"
              value={formInfo.entry}
              name="entry"
              placeholder="with great power..."
              onChange={handleEntryChange}
            />
          </fieldset>
        );
      case 2:
        return (
          <div className="relative flex h-36 flex-col overflow-hidden rounded-6 bg-gray-1 p-0.5">
            <Signature
              ref={svgRef}
              options={{
                size: 10,
                thinning: 0.25,
              }}
            />
            <input type="hidden" value={formInfo.signature} />
            <button
              aria-label="clear signature"
              className="group absolute bottom-1 left-1 self-end rounded-[4px] bg-gray-6 p-1 font-medium text-gray-11 transition duration-200 hover:bg-gray-8 hover:text-gray-12"
              type="button"
              onClick={() => svgRef.current?.clear()}
            >
              <ArrowBigDown className="transition duration-200 group-hover:rotate-180 " />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const validateStep = async (currentStep: number) => {
    setLoading(true);
    if (currentStep === 1) {
      const formData = new FormData();
      formData.append('created_by', formInfo.created_by);
      formData.append('entry', formInfo.entry);

      const result = await validateAndSaveEntry(formData, true);

      if (!result.success) {
        //@ts-ignore
        setErrors(result.errors);
        setLoading(false);
        return false;
      }
      setErrors(null);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return true;
  };

  const handleClick = async () => {
    // discoverEgg("FIND_A_NOTE");
    if (!localCreatedById) setLocalCreatedById(crypto.randomUUID());
    if (step === 3) {
      return;
    }

    if (!isOpen && step === 0) {
      setIsOpen(true);
      setStep(1);
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
      return;
    }

    if (step === 1) {
      const isValid = await validateStep(step);
      if (!isValid) return;
    }

    if (step === 2) {
      setLoading(true);
      const s = handleSVGCapture();
      if (!s) {
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('local_entry_id', crypto.randomUUID());
      formData.append('created_by', formInfo.created_by);
      formData.append('entry', formInfo.entry);
      formData.append('signature', s);
      formData.append(
        'hasCreatedEntryBefore',
        hasCreatedEntryBefore.toString()
      );
      formData.append('local_created_by_id', localCreatedById);
      await handleSubmit(formData);
      return;
    }

    setStep((prev) => prev + 1);
  };

  const getRandomPosition = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const handleSubmit = async (formData: FormData) => {
    const result = await validateAndSaveEntry(formData);
    if (!result.success) {
      //@ts-ignore
      setErrors(result.errors);
      setLoading(false);
      return;
    }

    // Get viewport dimensions safely on client-side
    const viewportWidth =
      typeof window !== 'undefined' ? window.innerWidth : 1300;
    const viewportHeight =
      typeof window !== 'undefined' ? window.innerHeight : 900;

    const newEntry = {
      id: crypto.randomUUID(),
      local_entry_id: formData.get('local_entry_id') as string,
      created_by: formData.get('created_by') as string,
      body: formData.get('entry') as string,
      signature: formData.get('signature') as string,
      initialX: getRandomPosition(100, viewportWidth - 100),
      initialY: getRandomPosition(100, viewportHeight - 100),
    };
    setLocalEntries((prev) => [newEntry, ...prev]);

    setStep(3);
    setIsOpen(false);
    setLoading(false);
    formRef.current?.reset();
    setHasCreatedEntryBefore(true);
    // discoverEgg("SUBMIT_A_ENTRY");
  };

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;
    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  return (
    <div className="-translate-x-1/2 md:-translate-x-0 absolute bottom-10 left-1/2 z-300 h-max w-max md:top-40 md:right-20 md:left-auto">
      <div
        className={cn(
          'flex h-fit w-72 items-center justify-center gap-x-1.5 rounded-md border border-gray-800/40 bg-black font-medium text-[1.5rem] text-gray-100 shadow-lg transition'
        )}
      >
        <MotionConfig transition={transition}>
          <div className="h-full w-full" ref={ref}>
            <form ref={formRef}>
              <div className="w-full overflow-hidden">
                <AnimatePresence initial={false} mode="sync">
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0 }}
                      animate={{ height: heightContent || 0 }}
                      exit={{ height: 0 }}
                      style={{
                        width: maxWidth,
                      }}
                    >
                      <div ref={contentRef} className="w-full">
                        <motion.div
                          key={'notes'}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isOpen ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <div
                            className={cn(
                              'px-4 pt-3 text-sm',
                              isOpen ? 'block' : 'hidden'
                            )}
                          >
                            <AnimatePresence>
                              {step === 1 && (
                                <motion.div
                                  className={cn(
                                    '-top-18 absolute left-0 w-full rounded-md border border-gray-800/40 bg-[#101B1D] px-4 py-2 text-center font-medium text-[1rem] shadow-lg',
                                    errors
                                      ? 'ring-2 ring-red-500/60'
                                      : 'text-gray-100'
                                  )}
                                  style={{
                                    textWrap: 'balance',
                                  }}
                                  initial={{ opacity: 0, y: -20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                >
                                  <AnimatePresence mode="wait" initial={false}>
                                    <motion.p
                                      key={
                                        errors?.created_by || errors?.entry
                                          ? 'error'
                                          : 'default'
                                      }
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 10 }}
                                    >
                                      {errors?.created_by || errors?.entry
                                        ? errors?.created_by || errors?.entry
                                        : `tnx for visiting! leave ur name and a note if u
                                want... <3`}
                                    </motion.p>
                                  </AnimatePresence>
                                </motion.div>
                              )}
                              {step === 2 && (
                                <motion.div
                                  className="-top-18 absolute left-0 w-full rounded-6 bg-[#101B1D] px-4 py-2 text-center font-medium text-[1rem] shadow-lg transition"
                                  style={{
                                    textWrap: 'balance',
                                  }}
                                  initial={{ opacity: 0, y: -20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{
                                    opacity: 0,
                                    y: -20,
                                    transition: {
                                      duration: 0.1,
                                    },
                                  }}
                                >
                                  why not a little drawing as well!{' '}
                                  <span>be creative!!</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            {stepConent(step, $svg)}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <button
                ref={menuRef}
                aria-label={'notes'}
                className={cn(
                  'relative flex w-full shrink-0 scale-100 select-none appearance-none items-center justify-center py-4 text-gray-100 lowercase transition hover:text-gray-300 focus-visible:ring-2 focus-visible:ring-gray-500 active:scale-[0.98]',
                  loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                )}
                type="button"
                disabled={pending || loading}
                onClick={handleClick}
              >
                {isOpen || step === 3 ? buttonText : 'write me a note'}
              </button>
            </form>
          </div>
        </MotionConfig>
      </div>
    </div>
  );
}
