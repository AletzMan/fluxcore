"use client";
import { Button, Link, Tabs } from "lambda-ui-components";
import { Plan } from "@/typesModels/Plan";
import { PlanCard } from "@/app/components/ui/PlanCard/PlanCard";
import styles from "../../page.module.scss";

interface PricingSectionProps {
    plans: Plan[];
}

export function PricingSection({ plans }: PricingSectionProps) {
    return (
        <section className={styles.pricing}>
            <h2>Elige el plan perfecto para ti</h2>
            <Tabs variant="box" color="primary" size="large" radius="medium">
                <Tabs.List>
                    <Tabs.Tab title="Mensual" />
                    <Tabs.Tab title="Anual" />
                </Tabs.List>
                <Tabs.Panels>
                    <Tabs.Panel>
                        <div className={styles.pricingGrid}>
                            {plans.map((plan: Plan) => {
                                const isPopular = plan.name.toUpperCase() === 'PRO';

                                return (
                                    <div key={plan.id} className={styles.pricingCardWrapper}>
                                        <PlanCard plan={plan as any} isHighlighted={isPopular} type="monthly">
                                            <Link
                                                href="/register"
                                                type="button"
                                                color={isPopular ? "primary" : "neutral"}
                                                variant={isPopular ? "solid" : "outline"}
                                                size="medium"
                                            >
                                                {'Comenzar ahora'}
                                            </Link>
                                        </PlanCard>
                                    </div>
                                );
                            })}
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <div className={styles.pricingGrid}>
                            {plans.map((plan: Plan) => {
                                const isPopular = plan.name.toUpperCase() === 'PRO';

                                return (
                                    <div key={plan.id} className={styles.pricingCardWrapper}>
                                        <PlanCard plan={plan as any} isHighlighted={isPopular} type="yearly">
                                            <Link
                                                href="/register"
                                                type="button"
                                                color={isPopular ? "primary" : "neutral"}
                                                variant={isPopular ? "solid" : "outline"}
                                                size="medium"
                                            >
                                                {'Comenzar ahora'}
                                            </Link>
                                        </PlanCard>
                                    </div>
                                );
                            })}
                        </div>
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </section>
    );
}
